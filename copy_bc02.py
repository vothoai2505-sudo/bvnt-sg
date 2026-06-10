import sys, glob, os, shutil
sys.stdout.reconfigure(encoding='utf-8')

# Find newest BC02 file
inbound = r'C:\Users\Lenovo\.openclaw\media\inbound'
files = []
for f in os.listdir(inbound):
    if f.startswith('BC02') and f.endswith('.xlsx'):
        full = os.path.join(inbound, f)
        files.append((os.path.getmtime(full), full, f))

files.sort(reverse=True)
if files:
    newest = files[0][1]
    dest = r'C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data\BC02_T6_2026.xlsx'
    shutil.copy2(newest, dest)
    print(f'Copied: {newest} -> {dest}')
else:
    print('No BC02 files found!')
