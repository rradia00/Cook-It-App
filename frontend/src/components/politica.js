import React from 'react';

import cx from 'classnames';
import SVGIcon from 'components/SVGIcon';

import styles from './Dialog.scss';

const Dialog = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <SVGIcon
        className={styles.icon}
        name="dialog/warning"
        width="32"
        height="32"
      />
      <div className={styles.title}>Política de privacidad y condiciones de uso</div>
    </div>
    <div className={styles.message}>{message}</div>
    <div className={styles.buttons}>
        <button className={styles.button} onClick={onCancel}>
           Cancelar
        </button>
      <button className={cx(styles.button, styles.active)} onClick={onConfirm}>
                 Okay
      </button>
    </div>
  </div>
)
 
export default Dialog