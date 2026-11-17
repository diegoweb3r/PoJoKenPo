export function GameLayout(){
    return (
        <div className="game-layout">
            <main className="game-container">
                <section className="rival-hand"></section>
                <section className="game-board"></section>
                <section className="player-hand"></section>
            </main>
            <aside className="history-container"></aside>
        </div>
    )
}