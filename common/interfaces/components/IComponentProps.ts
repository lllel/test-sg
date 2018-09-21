import {EventTypes} from "../enums/EventTypes";
import {FormContainer} from "../../components/form_container/FormContainer";

export interface IComponentProps {
    formRef?: FormContainer;                                            //-- ссылка на форму
    name?: string;                                                      //-- имя компоненты
    event?: (name: string, type: EventTypes, data: any) => void;        //-- события происходящие в компоненте
    value?: any;                                                        //-- значение компоненты
    required?: boolean;                                                 //-- обязательно должно быть значение, если отсутствует то false
    disabled?: boolean;                                                 //-- заблокирован, если отсутствует то false
    className?: string;                                                 //-- заблокирован, если отсутствует то false
}
