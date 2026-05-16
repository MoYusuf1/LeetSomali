import Layout from '@/components/Layout'

export default function Social() {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-bg-secondary rounded-2xl p-12 border border-border-default text-center max-w-md w-full">
          <span className="text-5xl mb-4 block">💬</span>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Community</h1>
          <p className="text-text-secondary text-sm">The social hub page is coming soon. Lesson comments, leaderboard, and study groups.</p>
        </div>
      </div>
    </Layout>
  )
}
