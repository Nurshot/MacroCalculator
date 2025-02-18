"""r2

Revision ID: cce7b6d7834b
Revises: 876d8a959284
Create Date: 2024-05-31 10:50:37.796915

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel             # NEW


# revision identifiers, used by Alembic.
revision = 'cce7b6d7834b'
down_revision = '876d8a959284'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'favoriterecipe', 'user', ['user_id'], ['user_id'])
    op.create_foreign_key(None, 'favoriterecipe', 'recipe', ['recipe_id'], ['recipe_id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'favoriterecipe', type_='foreignkey')
    op.drop_constraint(None, 'favoriterecipe', type_='foreignkey')
    # ### end Alembic commands ###
