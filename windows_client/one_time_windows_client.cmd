:: Hiding commands
@echo off

python --version 3>NUL
if errorlevel 1 goto errorNoPython

:: Install dependencies
echo [Argos] Installing dependencies
python -m pip install --upgrade pip > NUL && pip install -r %~dp0/dependencies > NUL
echo [Argos] Starting argos...

:: Check if script is indeed runned as administrator.
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [Argos] Success: Administrative permissions confirmed.
) else (
    powershell -Command "& {Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('[Argos] Failure: Current permissions inadequate. The script must be run with admin rights', 'Argos', 'ok', [System.Windows.Forms.MessageBoxIcon]::Error);}" > NUL
    echo [Argos] Failure: Current permissions inadequate.
    goto:exit
)

:: Start argos
chdir %~dp0
python3 %~dp0/windows_client.py
::pause

::Exiting script before error print
:exit
goto:eof

:: Print error
:errorNoPython
echo.
echo Error^: Python not installed
"C:\Program Files\used\systems\innoventiq\accumanager\required\excutables\python-3.7.3-amd64.exe"
