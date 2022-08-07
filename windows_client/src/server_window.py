""" Imports """
from tkinter import N, Label, ttk, Scrollbar, Frame, Listbox, LEFT, RIGHT, END, VERTICAL, Y
from src.w_class import Window
from src.log_service import log_service
from src.socket_server import socket_server
import socketio
import threading
from src.status_data import check_status, get_status_color

def start_server(WindowManager: Window) -> None:
    """ Start server function """

    # Deleting useless elements
    to_delete = [
        "validate_button",
        "cancel_button",
        "inside_frame",
        "warning_text",
        "protection_alert"
    ]
    WindowManager.destroy_element_list_by_name(to_delete)

    # Adding new elements

    # outframe

    out_frame = Frame(master=WindowManager.frame, borderwidth=0, bg="#202020")
    out_frame.grid(row=2, column=0, padx=25, pady=25)
    WindowManager.add_element(out_frame, "out_frame")

    # frame to scroll

    inside_frame = Frame(master=WindowManager.out_frame, borderwidth=0, bg="#202020")
    inside_frame.grid(row=0, column=0)
    WindowManager.add_element(inside_frame, "inside_frame")

    list_box = Listbox(master=WindowManager.inside_frame, width=50, height=12, font=('Roboto', 11, 'bold'), fg='white', bg='#333333', borderwidth=0)
    WindowManager.add_element(list_box, "list_box")
    list_box.pack(side=LEFT)
    list_box.focus_set()

    logs = log_service(list_box=list_box, save=True)

    logs.info("Starting server...")

    WindowManager.add_element(logs, "logs")

    style=ttk.Style()
    style.theme_use('classic')
    style.configure("Vertical.TScrollist_boxar", background="green", bordercolor="red", arrowcolor="white")

    ver_sb = Scrollbar(master=WindowManager.inside_frame, orient=VERTICAL)
    ver_sb.pack(side=RIGHT, fill=Y)

    WindowManager.list_box.config(yscrollcommand=ver_sb.set)
    ver_sb.config(command=WindowManager.list_box.yview)

    # Informations box

    right_frame = Frame(master=WindowManager.out_frame, borderwidth=0, bg="#202020")
    right_frame.grid(row=0, column=1, padx=25, sticky=N)
    WindowManager.add_element(element=right_frame, name="right_frame")

    status : True | False = False

    WindowManager.add_element(status, "status")

    status_label = Label(
        master=WindowManager.right_frame,
        text="Status : ",
        bg="#202020",
        fg="white"
    )

    status_label.grid(row=0, column=0)
    WindowManager.add_element(status_label, "status_label")

    status_text = Label(master=WindowManager.right_frame,
    text=check_status(WindowManager.status),
    bg="#202020"
    )

    status_text.grid(row=0, column=1)
    status_text.config(fg=get_status_color(WindowManager.status))

    WindowManager.add_element(status_text, "status_text")

    targeted_server_label = Label(
        master=right_frame,
        text="Targeted Server : ",
        bg="#202020",
        fg="white"
    )
    targeted_server_label.grid(row = 1, column=0)

    WindowManager.add_element(element=targeted_server_label, name="targeted_server_label")

    targeted_server_value = Label(
        master=WindowManager.right_frame,
        text=WindowManager.url,
        bg="#202020",
        fg="white"
    )

    targeted_server_value.grid(row = 1, column = 1)

    WindowManager.add_element(element=targeted_server_value, name="targeted_server_value")

    thread = threading.Thread(target=socket_server, args=(WindowManager,))

    thread.start()












