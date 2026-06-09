import pandas as pd
import json, os

def clean_money(val):
    if pd.isna(val): return 0.0
    if isinstance(val, (int, float)): return float(val)
    s = str(val).replace(',', '').strip()
    try: return float(s)
    except: return 0.0

def parse_date(val):
    if pd.isna(val): return None
    if isinstance(val, pd.Timestamp): return val.strftime('%Y-%m-%d')
    s = str(val).strip()
    for fmt in ['%d-%m-%Y', '%d/%m/%Y', '%Y-%m-%d']:
        try: return pd.to_datetime(s, format=fmt).strftime('%Y-%m-%d')
        except: continue
    try: return pd.to_datetime(s, dayfirst=True).strftime('%Y-%m-%d')
    except: return None

def safe_str(val):
    if pd.isna(val): return ''
    return str(val).strip()

def find_col(columns, keywords):
    for col in columns:
        c = str(col).strip().lower()
        for kw in keywords:
            if kw == c: return col  # exact match first
    for col in columns:
        c = str(col).strip().lower()
        for kw in keywords:
            if kw in c: return col  # partial match
    return None

def extract_file(path, label, ban_col_name, nhom_col_name):
    print(f"\nExtracting: {label}")
    df = pd.read_excel(path, sheet_name=0)
    df.columns = [str(c).strip() for c in df.columns]
    
    afyp_col = find_col(df.columns, ['afyp', 'ayfp'])
    phong_col = find_col(df.columns, ['phòng kinh doanh'])
    ads_col = find_col(df.columns, ['ads'])
    ban_col = ban_col_name if ban_col_name in df.columns else find_col(df.columns, ['tên ban', 'ban'])
    nhom_col = nhom_col_name if nhom_col_name in df.columns else find_col(df.columns, ['tên nhóm', 'nhóm'])
    ma_dl_col = find_col(df.columns, ['mã đại lý'])
    ten_dl_col = find_col(df.columns, ['tên đại lý'])
    hl_col = find_col(df.columns, ['ngày hiệu lực'])
    ph_col = find_col(df.columns, ['ngày phát hành'])
    fyp_col = find_col(df.columns, ['fyp'])
    ip_col = find_col(df.columns, ['ip'])
    
    print(f"  AFYP={afyp_col}, Phòng={phong_col}, Ban={ban_col}, Nhóm={nhom_col}")
    
    records = []
    for _, row in df.iterrows():
        afyp = clean_money(row.get(afyp_col, 0)) if afyp_col else 0
        fyp_val = clean_money(row.get(fyp_col, 0)) if fyp_col else 0
        ip_val = clean_money(row.get(ip_col, 0)) if ip_col else 0
        hl_date = parse_date(row.get(hl_col)) if hl_col else None
        
        year = None; month = None
        if hl_date:
            parts = hl_date.split('-')
            year = int(parts[0]); month = int(parts[1])
        
        records.append({
            'p': safe_str(row.get(phong_col, '')),
            'a': safe_str(row.get(ads_col, '')),
            'b': safe_str(row.get(ban_col, '')),
            'n': safe_str(row.get(nhom_col, '')),
            'd': safe_str(row.get(ten_dl_col, '')),
            'v': round(afyp / 1000000, 2),  # AFYP Triệu
            'f': round(fyp_val / 1000000, 2),
            'i': round(ip_val / 1000000, 2),
            'y': year,
            'm': month,
            'h': hl_date,
        })
    
    print(f"  {len(records)} records")
    return records

all_records = []

# 2024: Ban column = 'Ban', Nhóm = 'Nhóm'
recs = extract_file(r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\2024_DMS.xlsx", "2024", "Ban", "Nhóm")
all_records.extend(recs)

# 2025: Ban = 'Tên ban', Nhóm = 'Tên nhóm'
recs = extract_file(r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\2025_KPI.xlsx", "2025", "Tên ban", "Tên nhóm")
all_records.extend(recs)

# 2026 Q1
recs = extract_file(r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\2026_Q1.xlsx", "2026_Q1", "Tên ban", "Tên nhóm")
all_records.extend(recs)

# 2026 T4 (file named T5)
recs = extract_file(r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\2026_T5.xlsx", "2026_T4", "Tên ban", "Tên nhóm")
all_records.extend(recs)

# 2026 T5 (file named T6)
recs = extract_file(r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\2026_T6_0306.xlsx", "2026_T5", "Tên ban", "Tên nhóm")
all_records.extend(recs)

# Only keep AFYP > 0
compact = [r for r in all_records if r['v'] > 0]
print(f"\nTotal records (AFYP>0): {len(compact)}")

# Build filter lists
phongs = sorted(set(r['p'] for r in compact if r['p']))
ads_list = sorted(set(r['a'] for r in compact if r['a']))
bans = sorted(set(r['b'] for r in compact if r['b']))
nhoms = sorted(set(r['n'] for r in compact if r['n']))
years = sorted(set(r['y'] for r in compact if r['y']))

print(f"Phòng: {len(phongs)} | ADS: {len(ads_list)} | Ban: {len(bans)} | Nhóm: {len(nhoms)} | Years: {years}")

# Print sample Ban names to verify
print(f"\nSample Ban names: {bans[:10]}")
print(f"Sample Nhóm names: {nhoms[:10]}")

output = {
    'records': compact,
    'filters': {
        'phongs': phongs,
        'ads': ads_list,
        'bans': bans,
        'nhoms': nhoms,
        'years': years,
    }
}

out_path = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\all_contracts.json"
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False)

print(f"\nSaved: {os.path.getsize(out_path)/1024/1024:.2f} MB")
print("DONE")
