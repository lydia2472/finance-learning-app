import Link from "next/link";
import ResetProgress from "@/components/ResetProgress";

const sourceTable = [
  {
    name: "SEC · investor.gov（美国证监会投资者教育）",
    url: "https://www.investor.gov",
    license: "美国联邦政府作品 · 公共领域",
    use: "知识框架与教学法参考，内容本地化改写",
  },
  {
    name: "CFPB（美国消费者金融保护局）",
    url: "https://www.consumerfinance.gov",
    license: "公共领域",
    use: "预算、信用、债务类知识点参考",
  },
  {
    name: "Khan Academy · Personal Finance",
    url: "https://www.khanacademy.org/college-careers-more/personal-finance",
    license: "CC BY-NC-SA（署名-非商业-相同方式共享）",
    use: "课程结构参考；本项目为非商业免费工具",
  },
  {
    name: "Bogleheads Wiki",
    url: "https://www.bogleheads.org/wiki",
    license: "CC BY-SA",
    use: "指数投资与资产配置方法论参考",
  },
  {
    name: "中国投资者网（证监会）",
    url: "https://www.investor.org.cn",
    license: "内容版权归证监会，转载需授权",
    use: "仅外链引用，不复制内容",
  },
  {
    name: "国家统计局",
    url: "https://www.stats.gov.cn/sj/zxfb/",
    license: "统计数据为事实性数据，可使用（注明来源）",
    use: "CPI 等宏观数据来源",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header>
        <Link href="/" className="text-sm text-stone-400 transition hover:text-stone-600">
          ← 返回首页
        </Link>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">来源与声明</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">
          本产品（v0.1 原型）为非商业、免费的投资者教育工具。课程内容由 AI
          基于下列权威来源辅助创作，并经人工核对。每个知识点的数字与规则均可回溯到来源链接。
        </p>
      </header>

      <section>
        <h2 className="mb-3 font-bold">内容来源与许可</h2>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-xs text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">来源</th>
                <th className="px-4 py-3 font-medium">许可</th>
                <th className="px-4 py-3 font-medium">在本产品中的用法</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {sourceTable.map((s) => (
                <tr key={s.url}>
                  <td className="px-4 py-3">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2"
                    >
                      {s.name} ↗
                    </a>
                  </td>
                  <td className="px-4 py-3 text-stone-500">{s.license}</td>
                  <td className="px-4 py-3 text-stone-600">{s.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-stone-400">
          若本产品未来商业化，将按许可协议要求移除所有「非商业」条款内容，并重新评估每项来源的授权。
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-bold">免责声明</h2>
        <div className="space-y-3 rounded-2xl border border-stone-200 bg-white p-6 text-sm leading-relaxed text-stone-600">
          <p>
            1. 本产品全部内容<b>仅为投资者教育与知识普及之目的，不构成任何投资建议</b>，亦不构成对任何证券、基金、保险等金融产品的推荐或要约。
          </p>
          <p>
            2. 内容力求准确可靠，但<b>不保证准确性、完整性与及时性</b>；涉及法规与政策的内容请以官方发布为准。据此操作，风险自担。
          </p>
          <p>
            3. 课程中的收益率均为<b>教学演示用的假设数字</b>，历史数据与示例不代表未来收益；任何投资都可能亏损。
          </p>
          <p>
            4. 部分内容由 AI 辅助创作并经人工审核。若本产品日后面向中国境内用户提供，将按《人工智能生成合成内容标识办法》添加显式与隐式标识。
          </p>
          <p>5. 本产品不提供个股/基金推荐、收益承诺、代客理财等任何投资咨询性质的服务。</p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-bold">隐私说明</h2>
        <p className="rounded-2xl border border-stone-200 bg-white p-6 text-sm leading-relaxed text-stone-600">
          v0.1 原型没有账号系统和服务器存储，你的学习进度（已完成课程、连续天数）只保存在本设备的浏览器
          localStorage 中，不会上传到任何地方。
        </p>
      </section>

      <section className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-6">
        <div className="text-sm text-stone-500">
          想重新开始阶段 1？可以清空本地学习进度。
        </div>
        <ResetProgress />
      </section>
    </div>
  );
}
