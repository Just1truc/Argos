import tkinter, PIL
import winsound
from tkinter import *
from tkinter import ttk
from tkinter.ttk import Style
from tkinter.messagebox import *
from turtle import color
from PIL import ImageTk, Image
import validators
import os
from src.server import start_server

def destroy_win():
    window.destroy()

def showPassword():
    url = url_entry_point.get()
    print(url)
    if (validators.url(url) != True):
        showerror('Oops', 'Url is invalid')
        return

    WARNING_TEXT = f'Argos will give total access to you computer to the person possesing the server at the url : {url}. The commands that are run could badly damage your computer.'

    # Destroying old url label

    url_entry_point.destroy()
    url_label.destroy()
    button.destroy()

    # Setting up new window

    protection_alert = Label(master=frame, text="WARNING", fg="yellow", bg="#202020", font=('Roboto', '11', 'bold'))
    protection_alert.grid(row=2, pady=5, padx=INSIDE_PADDING)

    warning_text = Text(master=frame, fg="white", bg="#202020", font=('Roboto', '11', 'bold'), wrap=WORD, borderwidth=0, width=30, height=6)
    warning_text.insert(END, WARNING_TEXT)
    warning_text.grid(row=3, pady=5, padx=INSIDE_PADDING)

    ## Setting up new validate or refuse button

    inside_frame = Frame(master=frame, relief= 'sunken', bg="#202020")
    inside_frame.grid(row = 4, column = 0, pady = (30, 20 + BLOCK_PADDING))
    
    cancel_button = Button(master=inside_frame, bg="red", fg="#333333", text="Cancel", borderwidth=0, cursor="hand2", font=('Roboto', '11', 'bold'), command=destroy_win)
    cancel_button.grid(row=0, column=0, ipadx = 10, ipady = 5, padx=5)

    validate_button = Button(master=inside_frame, bg="lightgreen", fg="#333333", text="Accept", borderwidth=0, cursor="hand2", font=('Roboto', '11', 'bold'), command=start_server)
    validate_button.grid(column=1, row = 0, ipadx = 10, ipady = 5, padx=5)

def askInfoWindow( Verify):

    global url_entry_point
    global window, frame, url_label, url_entry_point, INSIDE_PADDING, button, BLOCK_PADDING

    INSIDE_PADDING=50

    BLOCK_PADDING=30

    # Init window
    window = Tk()
    window.title("Argos")
    window.tk.call('wm', 'iconphoto', window._w, PhotoImage(file=f'../assets/ARG.png'))

    img = ImageTk.PhotoImage(Image.open(f'../assets/ARG.png').resize((100,100)))

    # frames
    frame = Frame(window, bg="#202020", relief= 'sunken')
    frame.pack(fill= BOTH, expand= True)

    # Init labels

    img_label = Label(frame, image=img, bg="#202020").grid(row=0, pady=(BLOCK_PADDING,0))

    url_label = Label(frame, text="Server Url", fg="white", bg="#202020", font=('Roboto', '11', 'bold'))

    url_label.grid(row=2, column=0, padx=INSIDE_PADDING, pady=5, sticky=W)

    url = ""
    url_entry_point = Entry(frame, textvariable=url, bg ='#333333', fg='white', insertbackground="white", validate="none", selectborderwidth=0, borderwidth=10, relief=FLAT)

    url_entry_point.grid(row = 3, column = 0, padx=INSIDE_PADDING)

    # Validate Button

    button = Button(frame, text='Validate', command = Verify, bg="lightgreen", borderwidth=0, cursor="hand2", font=('Roboto', '11', 'bold'))
    button.grid(row = 4, column = 0, ipadx = 10, ipady = 5, pady = (30, 20 + BLOCK_PADDING))

    window.mainloop()

