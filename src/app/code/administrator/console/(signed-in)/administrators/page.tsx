import { ActionButton, ActionForm, ConfirmDelete, TextField } from '@/components/admin/forms'
import { Badge, PageHead, Panel, TableFrame, td, th } from '@/components/admin/ui'
import { when } from '@/lib/admin/format'
import { requireAdmin } from '@/lib/server/admin/auth'
import { listAdmins, listSessions } from '@/lib/server/admin/data'
import { addAdministrator, removeAdministrator, revokeAdminSession } from '../../actions'

export const metadata = { title: 'Administrators' }

export default async function AdministratorsPage() {
  const me = await requireAdmin()
  const [admins, sessions] = await Promise.all([listAdmins(), listSessions()])

  return (
    <>
      <PageHead title="Administrators" note="Anyone on this list can sign in with a code sent to their email. Removing someone ends their sessions too." />
      <div className="grid grid-cols-1 gap-4 wide:grid-cols-[minmax(0,1fr)_340px]">
        <Panel title="Who can sign in">
          <ul className="flex flex-col divide-y divide-line-subtle">
            {admins.map((a) => (
              <li key={a.email} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-ink">
                    {a.email} {a.email === me.email && <Badge tone="blue">You</Badge>}
                  </span>
                  <span className="text-xs text-ink-muted">Added {when(a.created_at)}</span>
                </div>
                {a.email !== me.email && admins.length > 1 && (
                  <ConfirmDelete action={removeAdministrator} values={{ email: a.email }} label="Remove" question={`Remove ${a.email}?`} />
                )}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Add an administrator" className="self-start">
          <ActionForm action={addAdministrator} submit="Add" reset>
            <TextField name="email" label="Email address" type="email" maxLength={254} required />
          </ActionForm>
        </Panel>
      </div>

      <h2 className="mt-8 mb-3 font-display text-lg font-bold tracking-[-0.02em] text-ink">Active sessions</h2>
      <TableFrame>
        <thead>
          <tr>
            <th className={th}>Administrator</th>
            <th className={th}>Signed in</th>
            <th className={th}>Ends</th>
            <th className={th}>
              <span className="sr-only">Revoke</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.token_hash}>
              <td className={td}>
                {s.email} {s.token_hash === me.tokenHash && <Badge tone="blue">This browser</Badge>}
              </td>
              <td className={td}>{when(s.created_at)}</td>
              <td className={td}>{when(s.expires_at)}</td>
              <td className={td}>
                <ActionButton action={revokeAdminSession} values={{ token_hash: s.token_hash }} variant="ghost">
                  {s.token_hash === me.tokenHash ? 'Sign out here' : 'Revoke'}
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </TableFrame>
    </>
  )
}
