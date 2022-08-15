""" Imports """
import os
import sys
from stat import ST_MODE, S_ISDIR

def get_file_type(mode : ST_MODE) -> str:
    """ return file type """
    return 'directory' if S_ISDIR(mode) else 'text'

def file(path : str) -> list[str]:
    """ Give data about files in directory """
    files : list[str] = os.listdir(path)
    file_types : list[str] = []

    for data_sets in files:
        stats = os.lstat(f'{path}/{data_sets}')
        types = get_file_type(stats.st_mode) if stats.st_size else 'empty'
        file_types.append(f'{data_sets} : {types}')

    return file_types

if __name__ == '__main__':
    for inf in file(sys.argv[1]):
        print(inf)
