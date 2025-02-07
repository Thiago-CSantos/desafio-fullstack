import styles from "./styles.module.scss";

export default function DeleteModal({ publication, onConfirm, onClose }: any) {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <h2>Are you sure you want to delete this post?</h2>
                <p>{publication.title}</p>
                <div className={styles.buttons}>
                    <button onClick={() => onConfirm(publication.id)} className={styles.btn_delete_confirm}>Confirm</button>
                    <button onClick={onClose} className={styles.btn_cancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}