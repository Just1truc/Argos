from tkinter import END, Listbox

class log_service:

    """ Log service """

    def __init__(self, list_box : Listbox, save : True | False = False):
        self.base : str = "[Argos]"
        self.line_number : int = 0
        self.log_trace = []
        self.save_logs = save
        self.list_box = list_box

    def insert_log(self, string : str) -> None:
        """ A function that insert log into the visualisation component for the user to see """
        self.list_box.insert(END, string)

    def register_log(self, string : str) -> str:
        """ Add new generated log """
        if self.save_logs:
            self.log_trace.append(string)
        self.insert_log(string=string)
        self.line_number += 1
        return string

    def gen_log(self, lvl, text):
        """ Generate log with intensity lvl """
        return self.register_log(f'{self.line_number} - {self.base} | ({lvl}) | {text}')

    def warning(self, text):
        """ Generate warning lvl log """
        return self.gen_log("WARNING", text)

    def error(self, text):
        """ Generate error lvl log """
        return self.gen_log("ERROR", text)

    def info(self, text):
        """ Generate info lvl log """
        return self.gen_log("INFO", text)

    def success(self, text):
        """ Generate success lvl log """
        return self.gen_log("SUCCESS", text)
