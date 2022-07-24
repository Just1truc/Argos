import tkinter, PIL
from tkinter import *
from tkinter import ttk
from tkinter.ttk import Style
from tkinter.messagebox import *
from turtle import color
from PIL import ImageTk, Image
import validators

from cairo import FontWeight

def showPassword():
    password = entry_point.get()
    username = username_entry_point.get()
    url = url_entry_point.get()
    print(url)
    print('checking')
    if (validators.url(url) != True):
        showerror('Oops', 'Url is invalid')
        return
    

def askInfoWindow( Verify):

    global entry_point, username_entry_point, url_entry_point
    global window

    INSIDE_PADDING=50

    BLOCK_PADDING=30

    # Init window
    window = Tk()
    window.title("Argos")

    img = ImageTk.PhotoImage(Image.open('./assets/ARG.png').resize((100,100)))

    # frames
    frame = Frame(window, bg="#202020", relief= 'sunken')
    frame.pack(fill= BOTH, expand= True)

    # Init labels

    img_label = Label(frame, image=img, bg="#202020").grid(row=0, pady=(BLOCK_PADDING,0))

    username_title_label = Label(frame, text="Admin username", fg="white", bg="#202020", font=('Roboto', '11', 'bold'))

    username_title_label.grid(row=1, column=0, padx=INSIDE_PADDING, pady=10, sticky=W)

    username_info = ""
    username_entry_point = Entry(frame, textvariable=username_info, bg ='#333333', fg='white', insertbackground="white", validate="none", selectborderwidth=0, borderwidth=10, relief=FLAT)

    username_entry_point.grid(row = 2, column = 0, padx=INSIDE_PADDING)

    username_entry_point.focus_set()

    title_label = Label(frame, text="Admin password", fg="white", bg="#202020", font=('Roboto', '11', 'bold'))

    title_label.grid(row=3, column=0, padx=INSIDE_PADDING, pady=10, sticky=W)

    info = ""
    entry_point = Entry(frame, textvariable=info, show='*', bg ='#333333', fg='white', insertbackground="white", validate="none", selectborderwidth=0, borderwidth=10, relief=FLAT)

    entry_point.grid(row = 4, column = 0, padx=INSIDE_PADDING)

    entry_point.focus_set()

    url_label = Label(frame, text="Server Url", fg="white", bg="#202020", font=('Roboto', '11', 'bold'))

    url_label.grid(row=5, column=0, padx=INSIDE_PADDING, pady=10, sticky=W)

    url = ""
    url_entry_point = Entry(frame, textvariable=url, bg ='#333333', fg='white', insertbackground="white", validate="none", selectborderwidth=0, borderwidth=10, relief=FLAT)

    url_entry_point.grid(row = 6, column = 0, padx=INSIDE_PADDING)

    # Validate Button

    button = Button(frame, text='Validate', command = Verify, bg="lightgreen", borderwidth=0, cursor="hand2", font=('Roboto', '11', 'bold'))
    button.grid(row = 7, column = 0, ipadx = 10, ipady = 5, pady = (30, 20 + BLOCK_PADDING))

    window.mainloop()

askInfoWindow(Verify=showPassword)

