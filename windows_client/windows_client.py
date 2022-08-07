""" Imports """
from src.askers import test_url, start_window

if __name__ == '__main__':
    print("[Argos] Launched")
    start_window(check_fun=test_url)
