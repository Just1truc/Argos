def check_status(status : True | False):
    """ Status to value """
    return 'disconnected' if not status else 'connected'

def get_status_color(status : True | False):
    """ Get status color depending on status """
    return 'red' if not status else 'lightgreen'