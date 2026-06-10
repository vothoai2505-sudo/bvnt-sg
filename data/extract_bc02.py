import pandas as pd
import json, os, datetime, sys
sys.stdout.reconfigure(encoding='utf-8')

path = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\BC02_T6_2026.xlsx"

# Read file - pandas auto-detects header row
df = pd.read_excel(path, sheet_name=0)

# Column names are already Vietnamese: TÊN PHÒNG, TÊN BAN, etc.
# No need for iloc[0]/iloc[1:] trick

def safe_str(val):
    if pd.isna(val): return ''
    return str(val).strip()

def clean_money(val):
    if pd.isna(val): return 0.0
    if isinstance(val, (int, float)): return float(val)
    try: return float(str(val).replace(',','').strip())
    except: return 0.0

records = []
for _, row in df.iterrows():
    afyp = clean_money(row.get('AFYP', 0))
    ip = clean_money(row.get('IP', 0))
    stbh = clean_money(row.get('STBH', 0))

    records.append({
        'p': safe_str(row.get('TÊN PHÒNG', '')),
        'b': safe_str(row.get('TÊN BAN', '')),
        'n': safe_str(row.get('TÊN NHÓM', '')),
        'd': safe_str(row.get('TÊN ĐẠI LÝ', '')),
        'a': safe_str(row.get('TÊN ADS', '')),
        'tt': safe_str(row.get('TÌNH TRẠNG HỒ SƠ', '')),
        'nt': safe_str(row.get('NGÀY THU', '')),
        'np': safe_str(row.get('NGÀY PHÁT HÀNH', '')),
        'bmbh': safe_str(row.get('BÊN MUA BẢO HIỂM (BMBH)', '')),
        'v': round(afyp / 1000000, 2),
        'ip_tr': round(ip / 1000000, 2),
        'stbh_tr': round(stbh / 1000000, 2),
    })

# Summary
total_afyp = sum(r['v'] for r in records)
total_hd = len(records)
co_hl = len([r for r in records if 'hiệu lực' in r['tt'].lower()])
cho_dgrr = len([r for r in records if 'chờ' in r['tt'].lower() or 'đang' in r['tt'].lower()])
unique_dl = len(set(r['d'] for r in records if r['d']))

print(f"BC02 Tháng 6/2026:")
print(f"  Tổng HĐ: {total_hd}")
print(f"  Có hiệu lực: {co_hl}")
print(f"  Chờ/Đang ĐGRR: {cho_dgrr}")
print(f"  Tổng AFYP: {total_afyp:.1f} Triệu VNĐ")
print(f"  Số TVV: {unique_dl}")

# Get date range
dates = [r['nt'] for r in records if r['nt']]
print(f"  Ngày thu: {min(dates) if dates else 'N/A'} → {max(dates) if dates else 'N/A'}")

now = datetime.datetime.now().strftime('%d/%m/%Y %H:%M')

output = {
    'month_label': 'Tháng 6/2026',
    'updated': now,
    'records': records,
    'summary': {
        'afyp_trieu': round(total_afyp, 1),
        'hd': total_hd,
        'co_hieu_luc': co_hl,
        'cho_dgrr': cho_dgrr,
        'tvv': unique_dl
    }
}

out_path = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\bc02_current.json"
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False)

print(f"\nSaved: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")
print("DONE")
