import pandas as pd

df = pd.read_csv('kindle_reviews.csv')
df['likes'], df['dislikes'] = 0, 0

df.rename(columns={'Unnamed: 0': 'reviewID'}, inplace=True)

for i in range(len(df)):
    helpful = df.at[i, 'helpful']
    helpful = helpful[1:-1]
    split = helpful.split(',')

    df.at[i, 'likes'] = int(split[0])
    df.at[i, 'dislikes'] = int(split[1][1:])

df.drop('helpful', axis=1).to_csv('kaggle_processed.csv', sep='\t', index=False)
print("Done")
