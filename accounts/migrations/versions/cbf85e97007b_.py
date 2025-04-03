"""empty message

Revision ID: cbf85e97007b
Revises: eddffe1a1f89
Create Date: 2023-03-03 19:37:31.585328

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision = "cbf85e97007b"
down_revision = "eddffe1a1f89"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "account", "email", existing_type=sa.VARCHAR(), nullable=True
    )
    op.create_unique_constraint(None, "account", ["email"])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "account", type_="unique")
    op.alter_column(
        "account", "email", existing_type=sa.VARCHAR(), nullable=False
    )
    # ### end Alembic commands ###
