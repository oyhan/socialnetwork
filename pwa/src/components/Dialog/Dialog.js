import { IonActionSheet, setupConfig } from '@ionic/react';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import './Dialog.css'
setupConfig({
    rippleEffect: false,
    mode: 'ios'
  });

export default function Dialog({ open, items, handleClose }) {

    const onclose = () => {
        console.log("onclose");
        handleClose()
    }

    const ionicItems = items.filter(i => i.visible).map(i => ({ text: i.title, handler: i.action }));

    return (

        <IonActionSheet
            isOpen={open}
            onDidDismiss={onclose}
            cssClass='my-custom-class'
            buttons={[...ionicItems, {
                text: 'انصراف',
                role: 'cancel',

            }]}
        >
        </IonActionSheet>
       
    );
}
