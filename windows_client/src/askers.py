""" Imports """
## Importing tkinter as window manager ##
from tkinter import Text, Frame, Button, Label, END, BOTH, Tk, Entry, W, FLAT, PhotoImage, WORD
from tkinter.messagebox import showerror

## Importing Pillow for image resizing ##
from PIL import ImageTk, Image

## Importing validators to check url ##
import validators

## Importing local packages ##
from src.server_window import start_server
from src.w_class import Window

def destroy_win():
    """ Destroy window and quit the program properly """
    WINDOW_MANAGER.destroy_window()
    exit(1)

def launch_server_w_args():
    """ Middle function to start server with WindowManager as argument """
    start_server(WINDOW_MANAGER)

def test_url():
    """ Test Url and continue program """

    url = WINDOW_MANAGER.url_entry_point.get()
    print(url)
    if not validators.url(url):
        showerror('Oops', 'Url is invalid')
        return

    WINDOW_MANAGER.add_element(url, "url")

    warning_data = ('Argos will give total access to you computer to'
    f'the person possesing the server at the url : {url}.'
    'The commands that are run could badly damage your computer.')

    # Destroying old url label

    WINDOW_MANAGER.destroy_element_list_by_name(elmn_list=[
        "url_entry_point",
        "url_label",
        "button"
    ])

    # Setting up new window

    protection_alert = Label(
        master=WINDOW_MANAGER.frame,
        text="WARNING", fg="yellow",
        bg="#202020",
        font=('Roboto', '11', 'bold')
    )

    protection_alert.grid(
        row=2,
        pady=5,
        padx=INSIDE_PADDING
    )

    WINDOW_MANAGER.add_element(protection_alert, "protection_alert")

    warning_text = Text(
        master=WINDOW_MANAGER.frame,
        fg="white", bg="#202020",
        font=('Roboto', '11', 'bold'),
        wrap=WORD,
        borderwidth=0,
        width=30,
        height=6
    )

    warning_text.insert(END, warning_data)
    warning_text.grid(row=3, pady=5, padx=INSIDE_PADDING)
    WINDOW_MANAGER.add_element(warning_text, "warning_text")

    ## Setting up new validate or refuse button

    inside_frame = Frame(master=WINDOW_MANAGER.frame, relief= 'sunken', bg="#202020")
    inside_frame.grid(row = 4, column = 0, pady = (30, 20 + BLOCK_PADDING))
    WINDOW_MANAGER.add_element(inside_frame, "inside_frame")

    cancel_button = Button(
        master=WINDOW_MANAGER.inside_frame,
        bg="red",
        fg="#333333",
        text="Cancel",
        borderwidth=0,
        cursor="hand2",
        font=('Roboto', '11', 'bold'),
        command=destroy_win
    )

    cancel_button.grid(
        row=0,
        column=0,
        ipadx = 10,
        ipady = 5,
        padx=5
    )

    WINDOW_MANAGER.add_element(cancel_button, "cancel_button")

    validate_button = Button(
        master=WINDOW_MANAGER.inside_frame,
        bg="lightgreen",
        fg="#333333",
        text="Accept",
        borderwidth=0,
        cursor="hand2",
        font=('Roboto', '11', 'bold'),
        command=launch_server_w_args
    )

    validate_button.grid(
        column=1,
        row = 0,
        ipadx = 10,
        ipady = 5,
        padx=5
    )

    WINDOW_MANAGER.add_element(validate_button, "validate_button")

    WINDOW_MANAGER.center_window()

def start_window(check_fun):
    """ This function is the starting point of the program."""
    ## It launch the window that will be used as a IHM ##

    global WINDOW_MANAGER, INSIDE_PADDING, BLOCK_PADDING

    INSIDE_PADDING=50

    BLOCK_PADDING=30

    # Init window
    window = Tk()
    WINDOW_MANAGER = Window(window)
    WINDOW_MANAGER.window.title("Argos")
    WINDOW_MANAGER.window.tk.call(
        'wm',
        'iconphoto',
        WINDOW_MANAGER.window._w,
        PhotoImage(file='../assets/ARG.png')
    )

    img = ImageTk.PhotoImage(
        Image
        .open('../assets/ARG.png')
        .resize((100,100))
    )

    # frames
    WINDOW_MANAGER.add_element(Frame(
        window,
        bg="#202020",
        relief= 'sunken'),
    "frame")
    WINDOW_MANAGER.frame.pack(fill= BOTH, expand= True)

    # Init labels

    img_label = Label(WINDOW_MANAGER.frame, image=img, bg="#202020")
    img_label.grid(row=0, pady=(BLOCK_PADDING,0))

    WINDOW_MANAGER.add_element(img_label, "img_label")

    url_label = Label(
        WINDOW_MANAGER.frame,
        text="Server Url",
        fg="white",
        bg="#202020",
        font=('Roboto', '11', 'bold')
    )

    url_label.grid(
        row=2,
        column=0,
        padx=INSIDE_PADDING,
        pady=5,
        sticky=W
    )

    WINDOW_MANAGER.add_element(url_label, "url_label")

    url = ""
    url_entry_point = Entry(
        master=WINDOW_MANAGER.frame,
        textvariable=url,
        bg ='#333333',
        fg='white',
        insertbackground="white",
        validate="none",
        selectborderwidth=0,
        borderwidth=10,
        relief=FLAT
    )

    url_entry_point.grid(row = 3, column = 0, padx=INSIDE_PADDING)

    WINDOW_MANAGER.add_element(url_entry_point, "url_entry_point")

    # Validate Button

    button = Button(
        master=WINDOW_MANAGER.frame,
        text='Validate',
        command = check_fun,
        bg="lightgreen",
        borderwidth=0,
        cursor="hand2",
        font=('Roboto', '11', 'bold')
    )
    button.grid(row = 4, column = 0, ipadx = 10, ipady = 5, pady = (30, 20 + BLOCK_PADDING))

    WINDOW_MANAGER.add_element(button, "button")

    # center the window

    WINDOW_MANAGER.center_window()

    # main loop

    WINDOW_MANAGER.window.mainloop()
