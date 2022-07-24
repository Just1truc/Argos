
######################
# Log service
# [Version] : Linux
# 20/07/2022
######################


fg_colors = {
    "black" : 30,
    "red" : 31,
    "green" : 32,
    "yellow" : 33,
    "blue" : 34,
    "magenta" : 35,
    "cyan" : 36,
    "light_grey" : 37,
    "grey" : 90,
    "light_red" : 91,
    "light_green" : 92,
    "light_yellow" : 93,
    "light_blue" : 94,
    "light_magenta" : 95,
    "light_cyan" : 96,
    "white" : 97
}

bg_colors = {}

for key in fg_colors:
    bg_colors[key] = fg_colors[key] + 10

bold = {
    "normal" : 0,
    "bold" : 1,
    "faint" : 2,
    "italic" : 3,
    "underlined" : 4
}

class logService():
    def __init__(self):
        self.warning_bg = bg_colors["light_yellow"]
        self.warning_fg = fg_colors["light_yellow"]
        self.warning_bold = bold["normal"]
        self.success_bg = bg_colors["light_green"]
        self.success_fg = fg_colors["light_green"]
        self.success_bold = bold["bold"]
        self.info_bg = bg_colors["light_blue"]
        self.info_fg = fg_colors["light_blue"]
        self.info_bold = bold["normal"]
        self.error_bg = bg_colors["light_red"]
        self.error_fg = fg_colors["light_red"]
        self.error_bold = bold["bold"]
        self.reset_color = fg_colors["white"]
        self.reset_val = f'\033[{bold["normal"]};{str(self.reset_color)}m'

    def yesorno_prompt(self, text):
        return f'\033[{bold["normal"]};{str(fg_colors["cyan"])}m[Argos]\033[{str(fg_colors["white"])}m : {text} (\033[{str(fg_colors["green"])}my\033[{str(fg_colors["white"])}m/\033[{str(fg_colors["red"])}mn\033[{str(fg_colors["white"])}m)'

    def ask_prompt(self, text):
        return f'\033[{bold["normal"]};{str(fg_colors["cyan"])}m[Argos]\033[{str(fg_colors["white"])}m : {text} '

    def reset_colors(self):
        print(self.reset_val, end = '')

    def warning(self, text):
        print(f'\033[{str(self.warning_bold)};{str(self.warning_fg)}m[WARNING]{self.reset_val} :', text)
        self.reset_colors()
    
    def success(self, text):
        print(f'\033[{str(self.success_bold)};{str(self.success_fg)}m[SUCCESS]{self.reset_val} :', text)
        self.reset_colors()

    def info(self, text):
        print(f'\033[{str(self.info_bold)};{str(self.info_fg)}m[INFO]{self.reset_val} :', text)
        self.reset_colors()
    
    def error(self, text):
        print(f'\033[{str(self.error_bold)};{str(self.error_fg)}m[ERROR]{self.reset_val} :', text)
        self.reset_colors()


