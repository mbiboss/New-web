#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import unquote

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Redirect root to the working youtube player
        if self.path == '/':
            self.path = '/youtube-player.html'
        super().do_GET()
    
    def end_headers(self):
        # Add cache control headers to prevent caching
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    PORT = 5000
    with socketserver.TCPServer(("0.0.0.0", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"Serving at http://0.0.0.0:{PORT}/")
        httpd.serve_forever()