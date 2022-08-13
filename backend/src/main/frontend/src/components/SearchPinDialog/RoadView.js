import { Roadview } from "react-kakao-maps-sdk";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

function RoadView({
  visibleRoadViewDialog,
  setVisibleRoadViewDialog,
  positionX,
  positionY,
}) {
  return (
    <div>
      <Dialog maxWidth={"lg"} open={visibleRoadViewDialog}>
        <DialogTitle>로드뷰</DialogTitle>
        <DialogContent>
          <Roadview // 로드뷰를 표시할 Container
            position={{
              // 지도의 중심좌표
              lat: positionY,
              lng: positionX,
              radius: 50,
            }}
            style={{
              // 지도의 크기
              width: "1100px",
              height: "500px",
            }}
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setVisibleRoadViewDialog();
            }}
          >
            끄기
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RoadView;
