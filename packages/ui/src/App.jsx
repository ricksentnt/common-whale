import MainLayout from "./layout/MainLayout"
import MarketsPage from "./page/MarketsPage"

function App() {
  return (
    <div>
      <MainLayout>
        <div className="mt-16">
          <MarketsPage />
        </div>
      </MainLayout>
    </div>
  )
}

export default App
