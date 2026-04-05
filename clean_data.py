import glob
import pandas as pd

XLS_FOLDER = "./raw_states"

all_dfs = []

# Read all Excel files
for f in glob.glob(f"{XLS_FOLDER}/*.xls"):
    print(f"Reading: {f}")
    df = pd.read_excel(f, dtype=str)
    all_dfs.append(df)

# Merge all files
master = pd.concat(all_dfs, ignore_index=True)

print("Total rows before cleaning:", len(master))

# 🔹 Remove duplicates
master.drop_duplicates(inplace=True)

# 🔹 Remove rows with missing important fields
required_cols = [
    "STATE NAME",
    "DISTRICT NAME",
    "SUB-DISTRICT NAME",
    "Area Name"
]

master.dropna(subset=required_cols, inplace=True)

# 🔹 Trim spaces
master = master.apply(lambda x: x.str.strip() if x.dtype == "object" else x)

print("Total rows after cleaning:", len(master))

# Save cleaned data
master.to_csv("cleaned_village_data.csv", index=False)

print("✅ Cleaned file saved as cleaned_village_data.csv")