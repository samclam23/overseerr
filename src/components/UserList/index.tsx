import React from 'react';
import useSWR from 'swr';
import LoadingSpinner from '../Common/LoadingSpinner';
import type { User } from '../../../server/entity/User';
import Badge from '../Common/Badge';
import { FormattedDate } from 'react-intl';
import Button from '../Common/Button';
import { hasPermission } from '../../../server/lib/permissions';
import { Permission } from '../../hooks/useUser';

const UserList: React.FC = () => {
  const { data, error } = useSWR<User[]>('/api/v1/user');

  if (!data && !error) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="md:flex md:items-center md:justify-between mt-8 mb-6">
        <div className="flex-1 min-w-0 mx-4">
          <h2 className="text-2xl font-bold leading-7 text-cool-gray-100 sm:text-3xl sm:leading-9 sm:truncate">
            User List
          </h2>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="my-2 overflow-x-auto -mx-6 sm:-mx-6 md:mx-4 lg:mx-4">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-cool-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-cool-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                      Total Requests
                    </th>
                    <th className="px-6 py-3 bg-cool-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                      User Type
                    </th>
                    <th className="px-6 py-3 bg-cool-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 bg-cool-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 bg-cool-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 bg-cool-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="bg-cool-gray-600 divide-y divide-cool-gray-700">
                  {data?.map((user) => (
                    <tr key={`user-list-${user.id}`}>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatar}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm leading-5 font-medium text-white">
                              {user.username}
                            </div>
                            <div className="text-sm leading-5 text-gray-300">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div className="text-sm leading-5 text-white">
                          {user.requests.length}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <Badge badgeType="warning">Plex User</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">
                        {hasPermission(Permission.ADMIN, user.permissions)
                          ? 'Admin'
                          : 'User'}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">
                        <FormattedDate value={user.createdAt} />
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">
                        <FormattedDate value={user.updatedAt} />
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                        <Button buttonType="warning" className="mr-2">
                          Edit
                        </Button>
                        <Button buttonType="danger">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;