"""create users table

Revision ID: 98af2b893443
Revises: 428610b8f00c
Create Date: 2024-11-14 15:33:27.167440

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '98af2b893443'
down_revision = '428610b8f00c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('username', name=op.f('uq_users_username'))
    )
    with op.batch_alter_table('tea_Items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.create_unique_constraint(batch_op.f('uq_tea_Items_name'), ['name'])
        batch_op.create_foreign_key(batch_op.f('fk_tea_Items_user_id_users'), 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tea_Items', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_tea_Items_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('uq_tea_Items_name'), type_='unique')
        batch_op.drop_column('user_id')

    op.drop_table('users')
    # ### end Alembic commands ###
