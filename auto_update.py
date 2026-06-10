import os, sys, shutil, glob, subprocess, datetime, time

sys.stdout.reconfigure(encoding='utf-8')

def main():
    desktop = os.path.join(os.path.expanduser("~"), "Desktop")
    input_folder = os.path.join(desktop, "Cap_Nhat_Doanh_Thu")
    processed_folder = os.path.join(input_folder, "Da_Xu_Ly")

    # Tìm file Excel trong thư mục Cap_Nhat_Doanh_Thu (không vào Da_Xu_Ly)
    excel_files = [f for f in glob.glob(os.path.join(input_folder, "*.xlsx")) if not os.path.basename(f).startswith('~$')]

    if not excel_files:
        print("KHONG TIM THAY FILE EXCEL NAO TREN THU MUC Cap_Nhat_Doanh_Thu!")
        print("Boss vui long bo file BC02 vao thu muc nay roi chay lai nhe.")
        return

    # Lấy file mới nhất
    latest_file = max(excel_files, key=os.path.getmtime)
    print(f"Da tim thay file: {os.path.basename(latest_file)}")

    # Copy sang workspace để xử lý
    workspace_data = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon\data"
    target_path = os.path.join(workspace_data, "BC02_T6_2026.xlsx")

    print("Dang copy file vao he thong...")
    shutil.copy2(latest_file, target_path)

    # Chạy script Python extract_bc02.py để xuất file JSON
    print("Dang phan tich va trich xuat du lieu...")
    extract_script = os.path.join(workspace_data, "extract_bc02.py")
    result = subprocess.run(
        ["python", extract_script],
        env=dict(os.environ, PYTHONIOENCODING="utf-8"),
        capture_output=True, text=True, encoding='utf-8'
    )
    print(result.stdout)
    if result.returncode != 0:
        print(f"LOI TRICH XUAT: {result.stderr}")
        return

    # Push lên GitHub/Vercel — luôn push vào branch main
    print("Dang day du lieu moi len Website (Vercel)...")
    repo_dir = r"C:\Users\Lenovo\.openclaw\workspace\baoviet-saigon"
    os.chdir(repo_dir)

    # Đảm bảo đang ở branch main
    subprocess.run(["git", "checkout", "main"], capture_output=True)
    # Pull mới nhất trước khi push (tránh conflict)
    subprocess.run(["git", "pull", "origin", "main", "--rebase"], capture_output=True)

    subprocess.run(["git", "add", "data/bc02_current.json", "data/extract_bc02.py"])
    now_str = datetime.datetime.now().strftime('%d/%m/%Y %H:%M')
    subprocess.run(["git", "commit", "-m", f"Cap nhat BC02 - {now_str}"])

    push_result = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True)
    if push_result.returncode != 0:
        print(f"LOI PUSH: {push_result.stderr}")
        return

    # Move file gốc vào thư mục đã xử lý
    print("Don dep file...")
    if not os.path.exists(processed_folder):
        os.makedirs(processed_folder)

    dest_file = os.path.join(processed_folder, os.path.basename(latest_file))
    if os.path.exists(dest_file):
        base, ext = os.path.splitext(os.path.basename(latest_file))
        dest_file = os.path.join(processed_folder, f"{base}_{int(time.time())}{ext}")

    shutil.move(latest_file, dest_file)

    print("\n" + "="*50)
    print("HOAN THANH! WEBSITE DA DUOC CAP NHAT THANH CONG.")
    print(f"Du lieu moi: {now_str}")
    print("Boss hay doi khoang 30 giay va tai lai web nhe.")
    print("="*50)

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"CO LOI XAY RA: {e}")

    input("\nNhan Enter de thoat...")
