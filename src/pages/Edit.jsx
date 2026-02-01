import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";

import { DiaryDispatchContext, DiaryStateContext } from "../App";
import { useContext, useEffect, useMemo } from "react";


const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    const data = useContext(DiaryStateContext);

    const currentDiartItem = useMemo(() => {
        return data.find((item) => String(item.id) === String(params.id));
    },[params.id]);

    useEffect(() => {
        if(!currentDiartItem) {
            window.alert("존재하지 않는 일기입니다.");
            nav("/", {replace : true});
        }
    }, [currentDiartItem, nav])

    const onClickDelete = () => {
        if(window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
            onDelete(params.id);
            nav("/", {replace : true})
        }
    }

    const onSubmit = (input) => {
        if(window.confirm("일기를 정말 수정할까요?")) {
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
            nav("/", {replace : true})
        }
    }

    return <div>
        <Header title={"일기 수정하기"} 
                leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)}/>}
                rightChild={<Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />}
        />
        <Editor initData={currentDiartItem} onSubmit={onSubmit}/>
    </div>
}

export default Edit;