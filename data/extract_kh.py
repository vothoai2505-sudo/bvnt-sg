import pandas as pd
import json, os, sys

sys.stdout.reconfigure(encoding='utf-8')

path = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\KH_2026.xlsx"
df = pd.read_excel(path, sheet_name='Pháp lệnh chi tiết', header=None)

# Data starts at row 4 (index 3)
# Mapping columns:
# 1: Phòng
# 3: Ban
# 4: Nhóm
# 6: Tên Trưởng ban/Nhóm
# 7: Kế hoạch Cả năm
# 8-19: Tháng 1 -> 12

records = []
for i in range(3, len(df)):
    row = df.iloc[i]
    if pd.isna(row[1]) and pd.isna(row[3]) and pd.isna(row[4]):
        continue # Empty row
        
    phong = str(row[1]).strip() if pd.notna(row[1]) else ""
    ban = str(row[3]).strip() if pd.notna(row[3]) else ""
    nhom = str(row[4]).strip() if pd.notna(row[4]) else ""
    
    if phong == 'nan': phong = ""
    if ban == 'nan': ban = ""
    if nhom == 'nan': nhom = ""
    
    # Check if total is valid
    try:
        total = float(str(row[7]).replace(',','').strip())
    except:
        continue
        
    months = []
    for m in range(8, 20):
        try:
            val = float(str(row[m]).replace(',','').strip())
        except:
            val = 0.0
        months.append(val)
        
    records.append({
        'p': phong,
        'b': ban,
        'n': nhom,
        'total': total,
        'm1': months[0], 'm2': months[1], 'm3': months[2],
        'm4': months[3], 'm5': months[4], 'm6': months[5],
        'm7': months[6], 'm8': months[7], 'm9': months[8],
        'm10': months[9], 'm11': months[10], 'm12': months[11]
    })

out_path = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\kh_2026.json"
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(records, f, ensure_ascii=False)

print(f"Saved KH 2026 to {out_path} with {len(records)} records")
