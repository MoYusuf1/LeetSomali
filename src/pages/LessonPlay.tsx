import Layout from '@/components/Layout'
import { useParams } from 'react-router-dom'

export default function LessonPlay() {
  const { id } = useParams<{ id: string }>()
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-bg-secondary rounded-2xl p-12 border border-border-default text-center max-w-md w-full">
          <span className="text-5xl mb-4 block">🎮</span>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Lesson {id}</h1>
          <p className="text-text-secondary text-sm">The lesson gameplay page is coming soon. Interactive exercises with instant feedback.</p>
        </div>
      </div>
    </Layout>
  )
}
