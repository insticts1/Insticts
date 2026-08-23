from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json

PORT = 8000
ROOT = Path(__file__).parent
IMAGE_FOLDER = ROOT / "images"


class Handler(SimpleHTTPRequestHandler):

    def do_GET(self):

        # Automatically scan the images folder
        if self.path == "/api/wallpapers":

            wallpapers = []

            extensions = {
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
                ".gif"
            }

            if IMAGE_FOLDER.exists():

                for image in sorted(IMAGE_FOLDER.iterdir()):

                    if image.is_file() and image.suffix.lower() in extensions:

                        wallpapers.append({
                            "title": image.stem.replace("-", " ").replace("_", " ").title(),
                            "image": f"images/{image.name}"
                        })

            data = json.dumps(wallpapers).encode("utf-8")

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()

            self.wfile.write(data)

            return

        # Normal website files
        return super().do_GET()


print("")
print("================================")
print("       INSTICTS IS RUNNING")
print("================================")
print("")
print("Open this address in your browser:")
print("")
print("http://localhost:8000")
print("")
print("Drop wallpapers into the images folder")
print("then refresh the website.")
print("")

server = ThreadingHTTPServer(
    ("localhost", PORT),
    Handler
)

server.serve_forever()