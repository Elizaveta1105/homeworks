import string
from pathlib import Path
from sys import argv
from collections import defaultdict
import shutil


def mapping():
    latin_alphabet = list(string.ascii_letters)
    cyrilic_alphabet = list("абвгдеёжзийклмнопрстуфхцчшАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШ")

    MAP = {}

    for key, value in zip(cyrilic_alphabet, latin_alphabet):
        MAP[ord(key)] = value
    return MAP


def normalize(name: str):
    is_latin = name.isascii()
    is_alphabetic = name.isalnum()

    if not is_latin:
        name = name.translate(mapping())

    if not is_alphabetic:
        for i in name:
            if not i.isalnum():
                name = name.replace(i, "_")

    return name


def process_archives(root_path):
    category = "archives"
    extract_dir = root_path/category
    for file in extract_dir.iterdir():
        try:
            shutil.unpack_archive(file, extract_dir)
            file.unlink()
        except Exception:
            file.unlink()


def create_categories():
    categories = {
        "images": ['.jpeg', '.png', '.jpg', '.svg'],
        "videos": ['.avi', '.mp4', '.mov', '.mkv'],
        "documents": ['.doc', '.docs', '.txt', '.pdf', '.xlsx', '.pptx'],
        "music": ['.mp3', '.ogg', '.wav', '.amr'],
        "archives": ['.zip', '.gz', '.tar']
    }

    reversed_categories = defaultdict(str)

    for k, value in categories.items():
        for v in value:
            reversed_categories[v] = k

    return reversed_categories


def define_category(suffix):
    categories_dict = create_categories()
    category = "other"

    if suffix in categories_dict:
        category = categories_dict[suffix]

    return category


def move(root_path, file_path):
    suffix = file_path.suffix.lower()
    name = file_path.stem
    new_name = normalize(name)+suffix
    category = define_category(suffix)
    new_folder = root_path/category
    new_path = new_folder/new_name

    new_folder.mkdir(exist_ok=True)
    file_path.rename(new_path)


def sort_folder(root_path, folder_path):
    for el in folder_path.iterdir():
        if el.is_dir():
            sort_folder(root_path, el)
            if not any(el.iterdir()):
                el.rmdir()
        elif el.is_file():
            move(root_path, el)


def main():
    path = Path(argv[1])
    sort_folder(path, path)
    process_archives(path)


if __name__ == '__main__':
    main()
