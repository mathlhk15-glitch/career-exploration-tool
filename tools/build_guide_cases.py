import openpyxl,glob,re,json,os,collections
root=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
import sys
if len(sys.argv)!=2:
 raise SystemExit('사용법: python tools/build_guide_cases.py 원본파일.xlsx')
w=openpyxl.load_workbook(sys.argv[1],read_only=True,data_only=True)
s1,s2=w.worksheets
rows=[[('' if v is None else str(v)) for v in r[:15]] for r in list(s1.values)[4:] if isinstance(r[0],int)]
links=[[('' if v is None else str(v)) for v in r[:7]] for r in list(s2.values)[4:] if r[0] is not None]
assert len(rows)==775 and len(links)==39,(len(rows),len(links))
assert [int(x[0]) for x in rows]==list(range(1,776))
ids=re.findall(r"id: '([^']+)', name: '([^']+)'",open(root+'/data.js').read())
print('FIELDS',ids)
ids_set={i for i,n in ids}
patterns=[('med',r'의학|의예|간호|약학|보건|바이오|생명|식품|치의|수의|의료|물리치료|임상|재활|약제|한의'),('chem',r'화학|화공|소재|고분자|신소재'),('cs',r'컴퓨터|소프트웨어|인공지능|AI|데이터사이언스|정보보안|게임|정보통신'),('elec',r'전자|전기|반도체|에너지공학'),('mech',r'기계|항공|우주|자동차|로봇|조선'),('arch',r'건축|도시|조경|토목|교통'),('env',r'환경|생태|산림|해양|기후|지구환경'),('nat',r'물리|지구과학|천문|자연과학|스마트팜|농업|원예|식물|농생명'),('math',r'수학|통계'),('biz',r'경영|경제|금융|회계|무역|통상|세무|관광|호텔'),('soc',r'정치|행정|사회|복지|법학|국제|외교|경찰|심리'),('edu',r'교육|사범|교직|유아'),('media',r'미디어|신문|방송|커뮤니케이션|광고|홍보'),('arts',r'미술|디자인|음악|체육|무용|스포츠|영화|연극|예술'),('hum',r'국어|영어|언어|문학|철학|사학|역사|인문|중어|일어|불어|독어|어문')]
pat=[(k,re.compile(p)) for k,p in patterns if k in ids_set]
def fields(major,sector,title):
 f=[k for k,p in pat if p.search(major)]
 if not f and major.strip() and major.strip()!='-':
  f=[k for k,p in pat if p.search(title)][:2]
 if not f:
  for needle,k in [('인문','hum'),('사회','soc'),('자연','nat'),('공학','mech'),('예체능','arts'),('의약','med')]:
   if needle in sector and k in ids_set:f=[k];break
 if not f: f=[]  # 근거 없는 첫 분야 할당 금지
 return f[:3]
def kind(method):
 # 문장 전체의 '조사' 단어 하나보다 실제 수행의 첫 단계와 명시적인 방법을 우선합니다.
 lines=[x.strip() for x in re.split(r'[\n\r]+|(?=[①②③④⑤⑥⑦⑧])',method or '') if x.strip()]
 text=' '.join(lines[:2]) if lines else (method or '')
 patterns=[('lit',r'독서|문헌|문학|작품|서평|논문|선행연구|자료\s*읽|텍스트\s*해석'),('exp',r'실험|배양|측정|시제품|제작|합성|현미경|관찰'),('data',r'통계|설문|표본|설문지|데이터|그래프|빈도|회귀|수치 분석'),('cmp',r'비교|대조|차이|공통점'),('soc',r'토론|정책|캠페인|제안|실천|기획|논증|프로젝트'),('data',r'자료\s*분석|조사|분석')]
 for k,pattern in patterns:
  if re.search(pattern,text,re.I):return k
 for k,pattern in patterns:
  if re.search(pattern,method or '',re.I):return k
 return ''
case=[{'raw':r,'fields':fields(r[4],r[3],r[8]),'kind':kind(r[14])} for r in rows]
linked=[{'raw':r,'fields':fields(r[2],'',r[3]+' '+r[4]+' '+r[5])} for r in links]
payload='// 2024-2027 가이드북 원문 전사 (원본 15열 및 7열 전체 보존, 분류는 참고용 자동 추정)\n// 생성 스크립트: tools/build_guide_cases.py\nconst GUIDE_CASES = '+json.dumps(case,ensure_ascii=False,separators=(',',':'))+';\nconst GUIDE_LINKS = '+json.dumps(linked,ensure_ascii=False,separators=(',',':'))+';\n'
open(root+'/guide-cases.js','w').write(payload)
print('counts',len(case),len(linked),'untyped',sum(not a['kind'] for a in case),'fieldcounts',collections.Counter(f for a in case for f in a['fields']))
