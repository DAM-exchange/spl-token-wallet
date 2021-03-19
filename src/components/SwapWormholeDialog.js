import React, { useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import DialogForm from './DialogForm';
import { balanceAmountToUserAmount } from './SendDialog';
import { abbreviateAddress } from '../utils/utils';

export default function SwapWormholeDialog({ open, onClose, balanceInfo }) {
  const [transferAmountString, setTransferAmountString] = useState('');
	const { amount: balanceAmount, decimals, tokenName, mint, tokenSymbol } = balanceInfo;

  const parsedAmount = parseFloat(transferAmountString) * 10 ** decimals;
	const validAmount = parsedAmount > 0 && parsedAmount <= balanceAmount;

	const convert = async () => {
			console.log('converting', parsedAmount);
	};

  return (
    <DialogForm
      open={open}
      onClose={onClose}
      onSubmit={convert}
      fullWidth
    >
			<DialogTitle>
			  Wormhole Convert {tokenName ?? abbreviateAddress(mint)}
        {tokenSymbol ? ` (${tokenSymbol})` : null}
			</DialogTitle>
			<DialogContent>
				<Typography>
				  {`This action will convert your sollet-wrapped tokens into wormhole-wrapped
          tokens. Are you sure you want to perform this action?`}
			  </Typography>
      <TextField
        label="Amount"
        fullWidth
        variant="outlined"
        margin="normal"
        type="number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={() =>
                  setTransferAmountString(
                    balanceAmountToUserAmount(balanceAmount, decimals),
                  )
                }
              >
                MAX
              </Button>
              {tokenSymbol ? tokenSymbol : null}
            </InputAdornment>
          ),
          inputProps: {
            step: Math.pow(10, -decimals),
          },
        }}
        value={transferAmountString}
        onChange={(e) => setTransferAmountString(e.target.value.trim())}
        helperText={
          <span
            onClick={() =>
              setTransferAmountString(
                balanceAmountToUserAmount(balanceAmount, decimals),
              )
            }
          >
            Max: {balanceAmountToUserAmount(balanceAmount, decimals)}
          </span>
        }
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
				<Button disabled={!validAmount} type="submit" color="primary">
          Convert
        </Button>
      </DialogActions>
    </DialogForm>
  );
}
