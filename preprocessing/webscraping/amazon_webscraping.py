#!/usr/bin/env python3

from bs4 import BeautifulSoup
import requests
import csv

input_file = 'asin.txt' # change this accordingly
output_file = 'output.csv'

# fake agent
headers = {
    'dnt': '1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'sec-fetch-dest': 'document',
    'referer': 'https://www.amazon.com/',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
}

# Input: "https://www.amazon.com/s?k=1603420304&ref=nb_sb_noss"
def get_title(url):
    
    try:
        resp = requests.get(url, headers=headers).text 
        soup = BeautifulSoup(resp, 'html.parser')
        
        title = soup.find('a', attrs={'class':'bookTitle'}).find('span').text
        
    except Exception as e:
        title = None
    
    finally:
        return title
    
with open(input_file, 'r') as reader:
    writer = csv.writer(open(output_file, "w"))

    for asin in reader:
        print(asin)
        url = f"https://www.goodreads.com/search?utf8=%E2%9C%93&q={asin}&search_type=books"

        title = get_title(url)

        if title == None:
            print(f"error: {url}")

        writer.writerow([asin, title])