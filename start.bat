@echo off
cd /d "%~dp0"
(py tools\make-manifest.py || python tools\make-manifest.py)
start "" http://localhost:8080
(py -m http.server 8080 || python -m http.server 8080)
