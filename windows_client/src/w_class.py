""" Imports """
from tkinter import Tk

class Window:
    """ Window managing class """

    def __init__(self, window : Tk):
        self.window : Tk = window

    def destroy_elements(self) -> None:
        """ This function destroy all items in the window """
        for element_name in self.__dict__:
            if element_name == "window":
                continue
            if not self.get_element(element_name):
                self.get_element(element_name).destroy()

    def get_element(self, name : str):
        """ Get element depending of his name """
        return getattr(self, name)

    def destroy_window(self) -> None:
        """ Destroy window components and the window itself """
        self.destroy_elements()
        return self.window.destroy()

    def destroy_element_list_by_name(self, elmn_list : list) -> None:
        """ Destroy all elements listed in the list given as parameter """
        for element in elmn_list:
            self.destroy_by_name(element)

    def destroy_by_name(self, name : str) -> None:
        """ Destroy an element by it's name """
        self.get_element(name).destroy()
        self.__delattr__(name)

    def add_element(self, element, name :str) -> None:
        """ Add new element """
        self.__setattr__(name, element)

    def center_window(self):
        """center the window """
        w, h = self.window.winfo_screenwidth(), self.window.winfo_screenheight()

        w_w, w_h = self.window.winfo_width(), self.window.winfo_height()

        self.window.geometry("+" + str(w // 2 - w_w // 2) +  "+" + str(h // 2 - w_h // 2))
        
