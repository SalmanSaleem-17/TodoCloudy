'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useGetUsersQuery } from '@/features/user/userThunks';
import { useAssignTaskMutation } from '@/features/tasks/taskThunks';
import { toast } from 'react-hot-toast';

export default function TaskAssignModal({
  taskId,
  onClose,
}: {
  taskId: string;
  onClose: () => void;
}) {
  const [assigneeId, setAssigneeId] = useState('');
  const { data: users } = useGetUsersQuery();
  const [assignTask, { isLoading }] = useAssignTaskMutation();

  const handleAssign = async () => {
    try {
      await assignTask({ taskId, assigneeId }).unwrap();
      toast.success('Task assigned successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to assign task');
    }
  };

  return (
    <Transition appear show={!!taskId} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Assign Task
                </Dialog.Title>
                <div className="mt-4">
                  <label
                    htmlFor="assignee"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assign to
                  </label>
                  <select
                    id="assignee"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    value={assigneeId}
                    onChange={(e) => setAssigneeId(e.target.value)}
                  >
                    <option value="">Select a user</option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!assigneeId || isLoading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50"
                    onClick={handleAssign}
                  >
                    {isLoading ? 'Assigning...' : 'Assign'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}