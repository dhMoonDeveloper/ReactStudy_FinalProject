import { useParams } from "react-router-dom"
import Header from "../components/Header"
import Button from "../components/Button"
import Viewer from "../components/Viewer"
import useDiary from "../hooks/useDiary";

import { useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/get-stringed_date";

const Diary = () => {
    const params = useParams();
    const nav = useNavigate();
    const curDiraryItem = useDiary(params.id);

    if(!curDiraryItem) {
        return <div>데이터 로딩중...!</div>
    }

    const {createdDate, emotionId, content} = curDiraryItem;
    const title = getStringedDate(new Date(createdDate));

    return <div>
            <Header title={`${title} 기록`}
                    leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
                    rightChild={<Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)}/>}
            
            />
            <Viewer emotionId={emotionId} content={content}/>
        </div>
}

export default Diary;