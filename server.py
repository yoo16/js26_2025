import http.server
import socketserver

# ポート番号を任意で設定: Webサーバ標準:80, 開発用:8000
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving HTTP on port {PORT} (http://localhost:{PORT}/) ...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user.")
    finally:
        httpd.server_close()
        print("✅ Clean shutdown complete.")