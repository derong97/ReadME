# Instructions

The provided `meta_kindle_store.json` file does not come with titles for many books. Hence we will use `asin` as the unique identifier to scrape the corresponding book title from `https://www.goodreads.com`.

1. There are 434702 lines in `asin.txt`. Depending on how many parallel processes you want, you can split the data accordingly. For example if you want to split into 2 files, run the following commands:
   ```
   awk 'NR>=1&&NR<=220000{print}NR>=2200001{exit}' asin.txt > asin1.txt
   awk 'NR>=220001{print}' asin.txt > asin2.txt
   ```
2. Provision GCP or AWS VMs accordingly. SSH into the terminal and download the following packages:
   ```
   sudo apt-get -y install python3-pip
   pip3 install beautifulsoup4
   pip3 install requests
   ```
3. Upload `amazon_webscraping.py` and `asin?.txt` to the corresponding VM. For each VM, `sudo nano amazon_webscraping.py` and edit the input filename to match the correct `asin?.txt`.
4. Run the script: `amazon_webscraping.py`
5. Download the `output.csv` and combine the results into a single file.
