import sqlite3, sys

db = r"C:\Users\Arman\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(db)
c = conn.cursor()

# List real user sessions (non-checkpoint-writer) from last 7 days
c.execute("""
SELECT id, title, time_created 
FROM session 
WHERE time_created > 1783843200000 
  AND title NOT LIKE 'checkpoint-writer:%'
ORDER BY time_created DESC
""")
print("=== RECENT USER SESSIONS ===")
for r in c.fetchall():
    print(f"  {r[0]} | {r[1][:80] if r[1] else ''} | {r[2]}")

# For the most recent session (navbar), get user statements
print("\n=== USER STATEMENTS IN ses_0870e734affe85gpNk7hkV7mOE ===")
c.execute("""
SELECT substr(json_extract(p.data, '$.text'), 1, 500)
FROM message m
JOIN part p ON p.message_id = m.id
WHERE m.session_id = 'ses_0870e734affe85gpNk7hkV7mOE'
  AND json_extract(m.data, '$.role') = 'user'
  AND json_extract(p.data, '$.type') = 'text'
ORDER BY m.time_created
""")
for r in c.fetchall():
    if r[0] and len(r[0].strip()) > 5:
        print(f"  USER: {r[0][:300]}")

# Check for user statements about rules/preferences across all sessions
print("\n=== USER STATEMENTS WITH 'rule' or 'decision' or 'always' or 'never' ===")
c.execute("""
SELECT substr(json_extract(p.data, '$.text'), 1, 400)
FROM message m
JOIN part p ON p.message_id = m.id
WHERE json_extract(m.data, '$.role') = 'user'
  AND json_extract(p.data, '$.type') = 'text'
  AND (json_extract(p.data, '$.text') LIKE '%rule%'
    OR json_extract(p.data, '$.text') LIKE '%decision%'
    OR json_extract(p.data, '$.text') LIKE '%always%'
    OR json_extract(p.data, '$.text') LIKE '%never%'
    OR json_extract(p.data, '$.text') LIKE '%remember%'
    OR json_extract(p.data, '$.text') LIKE '%workflow%')
ORDER BY m.time_created DESC
LIMIT 20
""")
for r in c.fetchall():
    if r[0] and len(r[0].strip()) > 10:
        print(f"  {r[0][:200]}")

# Check for errors across recent sessions
print("\n=== COMMON ERRORS IN RECENT SESSIONS ===")
c.execute("""
SELECT json_extract(m.data, 'session_id') as sid, substr(json_extract(p.data, '$.state.output'), 1, 300) as err
FROM message m
JOIN part p ON p.message_id = m.id
WHERE json_extract(p.data, '$.type') = 'tool'
  AND json_extract(p.data, '$.tool') = 'bash'
  AND json_extract(p.data, '$.state.output') LIKE '%Error%'
  AND m.time_created > 1783843200000
ORDER BY m.time_created DESC
LIMIT 15
""")
for r in c.fetchall():
    if r[0] and r[1]:
        print(f"  [{r[0]}] {r[1][:200]}")

conn.close()
