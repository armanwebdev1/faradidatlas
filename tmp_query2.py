import sqlite3

db = r"C:\Users\Arman\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(db)
c = conn.cursor()

# Check jobs items issue - same null ID as FAQs?
print("=== USER STATEMENTS ABOUT JOBS & PRODUCTS ===")
c.execute("""
SELECT substr(json_extract(p.data, '$.text'), 1, 500)
FROM message m
JOIN part p ON p.message_id = m.id
WHERE json_extract(m.data, '$.role') = 'user'
  AND json_extract(p.data, '$.type') = 'text'
  AND (json_extract(p.data, '$.text') LIKE '%job%'
    OR json_extract(p.data, '$.text') LIKE '%product%'
    OR json_extract(p.data, '$.text') LIKE '%howWeSupply%')
ORDER BY m.time_created DESC
LIMIT 20
""")
for r in c.fetchall():
    if r[0] and len(r[0].strip()) > 10:
        print(f"  USER: {r[0][:300]}")

# Check for sessions mentioning font, perf, live-preview, admin role
print("\n=== SESSIONS WITH 'font' OR 'perf' OR 'live' OR 'admin role' ===")
c.execute("""
SELECT s.id, s.title, s.time_created
FROM session s
WHERE s.title NOT LIKE 'checkpoint-writer:%'
  AND (s.title LIKE '%font%' OR s.title LIKE '%perf%' OR s.title LIKE '%live%' OR s.title LIKE '%admin%' OR s.title LIKE '%role%')
ORDER BY s.time_created DESC
""")
for r in c.fetchall():
    print(f"  {r[0]} | {r[1][:80]} | {r[2]}")

# Check assistant actions in the most recent real session (navbar bold)
print("\n=== TOOL CALLS IN ses_0870e734affe85gpNk7hkV7mOE ===")
c.execute("""
SELECT json_extract(p.data, '$.tool') as tool, substr(p.data, 1, 400) as preview
FROM message m
JOIN part p ON p.message_id = m.id
WHERE m.session_id = 'ses_0870e734affe85gpNk7hkV7mOE'
  AND json_extract(m.data, '$.role') = 'assistant'
  AND json_extract(p.data, '$.type') = 'tool'
ORDER BY m.time_created, p.time_created
""")
for r in c.fetchall():
    if r[0]:
        print(f"  TOOL: {r[0]} | {r[1][:200] if r[1] else ''}")

conn.close()
