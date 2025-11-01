export default function confirmDialog({onConfirm,onCancel}){
  return(
    <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Confirm Submission
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you have submitted this assignment? This action will mark
            it as complete.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Yes, I've Submitted
            </button>
          </div>
        </div>
      </div>
    </>
  )
}