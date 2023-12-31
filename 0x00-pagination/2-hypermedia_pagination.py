#!/usr/bin/env python3

"""
Implement a get_hyper method that takes the same arguments (and defaults) as
 get_page and returns a dictionary containing the following key-value pairs:
    page_size: the length of the returned dataset page
    page: the current page number
    data: the dataset page (equivalent to return from previous task)
    next_page: number of the next page, None if no next page
    prev_page: number of the previous page, None if no previous page
    total_pages: the total number of pages in the dataset as an integer
    Make sure to reuse get_page in your implementation.
You can use the math module if necessary.
"""

from ast import Dict
import csv
import math
from typing import List, Tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ return the appropriate page of the dataset """

        assert isinstance(page, int) and page > 0, \
            'Passed arguments are not integers greater than 0'
        assert isinstance(page_size, int) and page_size > 0, \
            'Passed arguments are not integers greater than 0'

        start, end = index_range(page, page_size)

        data = self.dataset()
        if start >= len(data):
            return []

        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """ returns a dictionary containing key-value pairs """
        dataset: List = self.dataset()
        try:
            data = self.get_page(page, page_size)
        except AssertionError:
            return {}

        totalPages: int = math.ceil(len(dataset) / page_size)

        return {
            'page_size': page_size if data != [] else 0,
            'page': page,
            'data': data,
            'next_page': (page + 1 if page < totalPages else None),
            'prev_page': (page - 1 if page > 1 else None),
            'total_pages': totalPages}


def index_range(page: int, page_size: int) -> Tuple:
    """  return a tuple containing a start and end index """

    start = (page - 1) * page_size
    end = start + page_size

    return (start, end)
