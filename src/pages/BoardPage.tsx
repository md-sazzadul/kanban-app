import BoardHeader from "../features/board/BoardHeader";
import BoardView from "../features/board/BoradView";

const BoardPage = () => {
  return (
    <div className="h-screen overflow-hidden">
      <BoardHeader />
      <BoardView />
    </div>
  );
};

export default BoardPage;
