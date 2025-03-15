import { ElMessageBox, ElMessage } from 'element-plus';

export function useConfirmDelete() {
  const confirmDelete = async (deleteCallback: () => Promise<void>) => {
    try {
      await ElMessageBox.confirm(
        'Are you sure you want to delete this item?',
        'Confirm Delete',
        {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      );

      // If the user confirms, execute the delete callback
      await deleteCallback();
      ElMessage.success('Item deleted successfully');
    } catch (error) {
      // If the user cancels, do nothing
      ElMessage.info('Delete canceled');
    }
  };

  return {
    confirmDelete,
  };
}