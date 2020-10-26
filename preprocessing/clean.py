import pandas as pd
import ast

df = pd.read_csv('kindle_reviews.csv')
df['likes'], df['dislikes'] = 0, 0

df.rename(columns={'Unnamed: 0': 'reviewID'}, inplace=True)

for i in range(len(df)):
    helpful = df.at[i, 'helpful']
    split = ast.literal_eval(helpful)
    df.at[i, 'likes'] = split[0]
    df.at[i, 'dislikes'] = split[1]

df.drop(['helpful', 'reviewID'], axis=1).to_csv('kaggle_processed.csv', sep='\t', index=False)
print("Done")
