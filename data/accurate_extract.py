import pandas as pd
import json, os, re

# ===== SCRIPT CHÍNH XÁC TUYỆT ĐỐI =====
# Mỗi file đều có ngày hiệu lực & ngày phát hành
# Cần xử lý: cột tiền có thể là TEXT (có dấu phẩy) hoặc số
# Cần chọn ĐÚNG sheet chứa dữ liệu chi tiết phát hành

def clean_money(val):
    """Convert money value: string '36,000,000.000' -> float 36000000.0, or keep numeric as-is"""
    if pd.isna(val):
        return 0.0
    if isinstance(val, (int, float)):
        return float(val)
    # It's a string like '36,000,000.000' 
    s = str(val).replace(',', '').strip()
    try:
        return float(s)
    except:
        return 0.0

def find_afyp_col(columns):
    """Find the AFYP column name (could be AFYP, AYFP, etc.)"""
    for col in columns:
        c = str(col).strip().upper()
        if c in ['AFYP', 'AYFP']:
            return col
    return None

def find_date_col(columns, keywords):
    """Find date column by Vietnamese keywords"""
    for col in columns:
        c = str(col).strip().lower()
        for kw in keywords:
            if kw in c:
                return col
    return None

def parse_date(val):
    """Parse Vietnamese date formats: dd-mm-yyyy, dd/mm/yyyy, or Timestamp"""
    if pd.isna(val):
        return pd.NaT
    if isinstance(val, pd.Timestamp):
        return val
    s = str(val).strip()
    for fmt in ['%d-%m-%Y', '%d/%m/%Y', '%Y-%m-%d']:
        try:
            return pd.to_datetime(s, format=fmt)
        except:
            continue
    try:
        return pd.to_datetime(s, dayfirst=True)
    except:
        return pd.NaT

def process_sheet(df, label):
    """Process a single sheet and return metrics"""
    afyp_col = find_afyp_col(df.columns)
    if not afyp_col:
        return None
    
    # Clean AFYP column
    df['_afyp_clean'] = df[afyp_col].apply(clean_money)
    
    # Find date columns
    date_hl_col = find_date_col(df.columns, ['ngày hiệu lực', 'hiệu lực'])
    date_ph_col = find_date_col(df.columns, ['ngày phát hành'])
    
    # Parse dates
    if date_hl_col:
        df['_date_hl'] = df[date_hl_col].apply(parse_date)
    if date_ph_col:
        df['_date_ph'] = df[date_ph_col].apply(parse_date)
    
    # Total AFYP in VND (raw)
    total_afyp_vnd = df['_afyp_clean'].sum()
    total_afyp_trieu = total_afyp_vnd / 1_000_000
    
    # Count records
    total_hd = len(df)
    
    # Date range
    date_info = {}
    if date_hl_col and '_date_hl' in df.columns:
        valid_dates = df['_date_hl'].dropna()
        if len(valid_dates) > 0:
            date_info['hl_min'] = str(valid_dates.min().date())
            date_info['hl_max'] = str(valid_dates.max().date())
    
    if date_ph_col and '_date_ph' in df.columns:
        valid_dates = df['_date_ph'].dropna()
        if len(valid_dates) > 0:
            date_info['ph_min'] = str(valid_dates.min().date())
            date_info['ph_max'] = str(valid_dates.max().date())
    
    # Monthly breakdown based on Ngày hiệu lực
    monthly = {}
    if date_hl_col and '_date_hl' in df.columns:
        df['_month'] = df['_date_hl'].dt.month
        for m in sorted(df['_month'].dropna().unique()):
            m = int(m)
            mask = df['_month'] == m
            monthly[m] = {
                'afyp_trieu': round(df.loc[mask, '_afyp_clean'].sum() / 1_000_000, 1),
                'hd': int(mask.sum())
            }
    
    return {
        'label': label,
        'afyp_trieu': round(total_afyp_trieu, 1),
        'afyp_vnd': total_afyp_vnd,
        'hd': total_hd,
        'dates': date_info,
        'monthly': monthly
    }

# ===== XỬ LÝ TỪNG FILE =====
results = {}

# 1. FILE 2024 (cột AYFP, dữ liệu TEXT)
print("="*60)
print("PROCESSING: 2024_DMS.xlsx")
path_2024 = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\2024_DMS.xlsx"
df_2024 = pd.read_excel(path_2024, sheet_name=0)
r2024 = process_sheet(df_2024, "2024_DMS - Sheet 0")
if r2024:
    results['2024'] = r2024
    print(f"  AFYP: {r2024['afyp_trieu']:,.1f} Triệu VNĐ | HĐ: {r2024['hd']} | Dates: {r2024['dates']}")
    print(f"  Monthly: {r2024['monthly']}")
else:
    print("  ERROR: No AFYP column found!")

# 2. FILE 2025 (Sheet 0 = chi tiết đầy đủ 45 cột)
print("\n" + "="*60)
print("PROCESSING: 2025_KPI.xlsx")
path_2025 = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\2025_KPI.xlsx"
df_2025 = pd.read_excel(path_2025, sheet_name=0)
r2025 = process_sheet(df_2025, "2025_KPI - Sheet 0 (full)")
if r2025:
    results['2025'] = r2025
    print(f"  AFYP: {r2025['afyp_trieu']:,.1f} Triệu VNĐ | HĐ: {r2025['hd']} | Dates: {r2025['dates']}")
    print(f"  Monthly: {r2025['monthly']}")

# 3. FILE 2026 Q1 - Sheet "Quý 1 (06.04)" = bản cập nhật mới hơn (847 rows vs 722)
print("\n" + "="*60)
print("PROCESSING: 2026_Q1.xlsx")
path_2026q1 = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\2026_Q1.xlsx"
xl_q1 = pd.ExcelFile(path_2026q1)
print(f"  Available sheets: {xl_q1.sheet_names}")

# Sheet 0 = "Quý 1 (HL 1.1.26) (0 nhóm)" => 722 rows, Ngày HL from 2026-01-01 to 2026-03-31
# Sheet 1 = "Quý 1 (06.04)" => 847 rows, Ngày HL from 2025-12-26 to 2026-03-31
# The question is: which one is the correct Q1 2026 data?
# Sheet 0 has "HL 1.1.26" in its name which means "Hiệu lực từ 1/1/2026" => Only HĐ effective from 1/1/2026
# Sheet 1 has date starting from 2025-12-26 => includes some late-2025 effective dates but published in 2026

# Let's use Sheet 0 (pure Q1 2026 by hiệu lực date 1/1/26 - 3/31/26) = 722 HĐ
# But also check Sheet 1 for comparison
for i, sname in enumerate(xl_q1.sheet_names[:2]):
    df_q1 = xl_q1.parse(sname)
    rq1 = process_sheet(df_q1, f"2026_Q1 - Sheet {i}: {sname}")
    if rq1:
        print(f"  Sheet '{sname}': AFYP: {rq1['afyp_trieu']:,.1f} Tr | HĐ: {rq1['hd']} | Dates: {rq1['dates']}")
        if i == 0:
            results['2026_q1'] = rq1

# 4. FILE 2026 T5 (Tháng 5)
print("\n" + "="*60)
print("PROCESSING: 2026_T5.xlsx")
path_2026t5 = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\2026_T5.xlsx"
xl_t5 = pd.ExcelFile(path_2026t5)
print(f"  Available sheets: {xl_t5.sheet_names}")
df_t5 = xl_t5.parse(xl_t5.sheet_names[0])
rt5 = process_sheet(df_t5, "2026_T5 - Sheet 0")
if rt5:
    results['2026_t5'] = rt5
    print(f"  AFYP: {rt5['afyp_trieu']:,.1f} Triệu VNĐ | HĐ: {rt5['hd']} | Dates: {rt5['dates']}")
    print(f"  Monthly: {rt5['monthly']}")

# 5. FILE 2026 T6 (ngày 03/06)
print("\n" + "="*60)
print("PROCESSING: 2026_T6_0306.xlsx")
path_2026t6 = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\2026_T6_0306.xlsx"
xl_t6 = pd.ExcelFile(path_2026t6)
print(f"  Available sheets: {xl_t6.sheet_names}")
df_t6 = xl_t6.parse(xl_t6.sheet_names[0])
rt6 = process_sheet(df_t6, "2026_T6 - Sheet 0")
if rt6:
    results['2026_t6'] = rt6
    print(f"  AFYP: {rt6['afyp_trieu']:,.1f} Triệu VNĐ | HĐ: {rt6['hd']} | Dates: {rt6['dates']}")
    print(f"  Monthly: {rt6['monthly']}")

# ===== TỔNG HỢP =====
print("\n" + "="*60)
print("FINAL SUMMARY:")
print("="*60)

for key, data in results.items():
    print(f"  {key}: AFYP = {data['afyp_trieu']:,.1f} Triệu VNĐ | {data['hd']} HĐ")

# Calculate cumulative 2026
if '2026_q1' in results and '2026_t5' in results and '2026_t6' in results:
    # Q1 covers T1-T3, T5 covers T5, T6 covers T6 (up to 03/06)
    # NOTE: T4 (April) data is MISSING!
    cum_afyp = results['2026_q1']['afyp_trieu'] + results['2026_t5']['afyp_trieu'] + results['2026_t6']['afyp_trieu']
    cum_hd = results['2026_q1']['hd'] + results['2026_t5']['hd'] + results['2026_t6']['hd']
    print(f"\n  2026 TÍCH LŨY (Q1 + T5 + T6): {cum_afyp:,.1f} Triệu VNĐ | {cum_hd} HĐ")
    print(f"  ⚠️ LƯU Ý: THIẾU DỮ LIỆU THÁNG 4/2026!")

# Save final JSON
output = {}
for key, data in results.items():
    output[key] = {
        'afyp_trieu': data['afyp_trieu'],
        'hd': data['hd'],
        'dates': data['dates'],
        'monthly': {str(k): v for k, v in data['monthly'].items()}
    }

with open(r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\verified_metrics.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("\n✅ DONE - verified_metrics.json saved.")
